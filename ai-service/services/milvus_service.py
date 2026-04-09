import logging
from pymilvus import (
    Collection,
    CollectionSchema,
    DataType,
    FieldSchema,
    connections,
    utility,
)

from config.constants import (
    DEFAULT_TOP_K,
    INDEX_NLIST,
    INDEX_TYPE,
    METRIC_TYPE,
    PRODUCT_EMBEDDINGS_COLLECTION,
    VECTOR_DIM,
)
from config.settings import settings

logger = logging.getLogger(__name__)


class MilvusService:
    def __init__(self):
        self._connected = False
        self._collection: Collection | None = None

    def connect(self):
        logger.info(
            "Connecting to Milvus at %s:%s", settings.milvus_host, settings.milvus_port
        )
        connections.connect(
            alias="default",
            host=settings.milvus_host,
            port=settings.milvus_port,
        )
        self._connected = True
        logger.info("Connected to Milvus")

    def disconnect(self):
        if self._connected:
            connections.disconnect("default")
            self._connected = False
            logger.info("Disconnected from Milvus")

    @property
    def is_connected(self) -> bool:
        return self._connected

    def ensure_collections(self):
        if not utility.has_collection(PRODUCT_EMBEDDINGS_COLLECTION):
            logger.info("Creating collection: %s", PRODUCT_EMBEDDINGS_COLLECTION)
            self._create_product_embeddings_collection()
        else:
            logger.info("Collection %s already exists", PRODUCT_EMBEDDINGS_COLLECTION)

        self._collection = Collection(PRODUCT_EMBEDDINGS_COLLECTION)
        self._collection.load()
        logger.info("Collection loaded into memory")

    def _create_product_embeddings_collection(self):
        fields = [
            FieldSchema(
                name="id", dtype=DataType.VARCHAR, is_primary=True, max_length=36
            ),
            FieldSchema(
                name="embedding", dtype=DataType.FLOAT_VECTOR, dim=VECTOR_DIM
            ),
            FieldSchema(name="name", dtype=DataType.VARCHAR, max_length=512),
            FieldSchema(name="brand", dtype=DataType.VARCHAR, max_length=256),
            FieldSchema(name="base_price", dtype=DataType.FLOAT),
            FieldSchema(name="categories", dtype=DataType.VARCHAR, max_length=512),
        ]
        schema = CollectionSchema(fields=fields, description="Product embeddings")
        collection = Collection(
            name=PRODUCT_EMBEDDINGS_COLLECTION, schema=schema
        )

        index_params = {
            "index_type": INDEX_TYPE,
            "metric_type": METRIC_TYPE,
            "params": {"nlist": INDEX_NLIST},
        }
        collection.create_index(field_name="embedding", index_params=index_params)
        logger.info("Collection and index created: %s", PRODUCT_EMBEDDINGS_COLLECTION)

    @property
    def collection(self) -> Collection:
        if self._collection is None:
            raise RuntimeError("Milvus collection not initialized.")
        return self._collection

    def upsert_product(
        self,
        product_id: str,
        embedding: list[float],
        name: str,
        brand: str,
        base_price: float,
        categories: str,
    ):
        self.delete_product(product_id)
        data = [
            [product_id],
            [embedding],
            [name],
            [brand],
            [base_price],
            [categories],
        ]
        self.collection.insert(data)
        self.collection.flush()

    def bulk_insert(
        self, ids: list[str], embeddings: list[list[float]], metadata: list[dict]
    ):
        if not ids:
            return

        # Delete existing entries first
        id_filter = ", ".join(f'"{pid}"' for pid in ids)
        self.collection.delete(expr=f"id in [{id_filter}]")

        names = [m["name"] for m in metadata]
        brands = [m["brand"] for m in metadata]
        prices = [m["base_price"] for m in metadata]
        categories = [m["categories"] for m in metadata]

        data = [ids, embeddings, names, brands, prices, categories]
        self.collection.insert(data)
        self.collection.flush()
        logger.info("Bulk inserted %d products into Milvus", len(ids))

    def search_products(
        self,
        query_embedding: list[float],
        top_k: int = DEFAULT_TOP_K,
    ) -> list[dict]:
        search_params = {"metric_type": METRIC_TYPE, "params": {"nprobe": 16}}

        results = self.collection.search(
            data=[query_embedding],
            anns_field="embedding",
            param=search_params,
            limit=top_k,
            output_fields=["name", "brand", "base_price", "categories"],
        )

        matches = []
        for hits in results:
            for hit in hits:
                matches.append(
                    {
                        "id": hit.id,
                        "score": round(hit.score, 4),
                        "name": hit.entity.get("name"),
                        "brand": hit.entity.get("brand"),
                        "base_price": hit.entity.get("base_price"),
                        "categories": hit.entity.get("categories"),
                    }
                )
        return matches

    def delete_product(self, product_id: str):
        self.collection.delete(expr=f'id == "{product_id}"')

    def get_stats(self) -> dict:
        return {
            "collection": PRODUCT_EMBEDDINGS_COLLECTION,
            "num_entities": self.collection.num_entities,
        }


milvus_service = MilvusService()
