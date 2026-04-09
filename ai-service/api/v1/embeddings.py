import logging

from fastapi import APIRouter, HTTPException

from models.schemas import (
    BulkIndexResponse,
    EmbeddingIndexRequest,
    EmbeddingSearchRequest,
    EmbeddingSearchResponse,
    ProductMatch,
)
from services.embedding_service import embedding_service
from services.milvus_service import milvus_service
from utils.http_client import get_all_products, get_product

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/embeddings", tags=["embeddings"])


@router.post("/index", response_model=dict)
async def index_product(request: EmbeddingIndexRequest):
    try:
        product = await get_product(request.product_id)
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Product not found: {e}")

    text = embedding_service.build_product_text(product)
    embedding = embedding_service.embed_text(text)

    categories = ", ".join(c.get("name", "") for c in product.get("categories", []))

    milvus_service.upsert_product(
        product_id=product["id"],
        embedding=embedding,
        name=product.get("name", ""),
        brand=product.get("brand", ""),
        base_price=float(product.get("basePrice", 0)),
        categories=categories,
    )

    return {"message": f"Product {product['id']} indexed successfully"}


@router.post("/bulk-index", response_model=BulkIndexResponse)
async def bulk_index_products():
    page = 1
    total_indexed = 0

    while True:
        response = await get_all_products(page=page, per_page=100)

        products = response.get("data", response) if isinstance(response, dict) else response
        if isinstance(products, dict):
            products = products.get("items", products.get("data", []))

        if not products:
            break

        ids = []
        embeddings = []
        metadata = []

        texts = [embedding_service.build_product_text(p) for p in products]
        batch_embeddings = embedding_service.embed_batch(texts)

        for product, emb in zip(products, batch_embeddings):
            categories = ", ".join(
                c.get("name", "") for c in product.get("categories", [])
            )
            ids.append(product["id"])
            embeddings.append(emb)
            metadata.append(
                {
                    "name": product.get("name", ""),
                    "brand": product.get("brand", ""),
                    "base_price": float(product.get("basePrice", 0)),
                    "categories": categories,
                }
            )

        milvus_service.bulk_insert(ids, embeddings, metadata)
        total_indexed += len(ids)

        total_count = response.get("total", 0) if isinstance(response, dict) else 0
        if total_count and total_indexed >= total_count:
            break

        page += 1

        if len(products) < 100:
            break

    logger.info("Bulk indexing complete: %d products", total_indexed)
    return BulkIndexResponse(
        indexed_count=total_indexed,
        message=f"Successfully indexed {total_indexed} products",
    )


@router.post("/search", response_model=EmbeddingSearchResponse)
async def search_products(request: EmbeddingSearchRequest):
    query_embedding = embedding_service.embed_text(request.query)
    results = milvus_service.search_products(query_embedding, top_k=request.top_k)

    matches = [ProductMatch(**r) for r in results]
    return EmbeddingSearchResponse(results=matches, query=request.query)


@router.delete("/{product_id}")
async def delete_product_embedding(product_id: str):
    milvus_service.delete_product(product_id)
    return {"message": f"Product {product_id} removed from index"}
