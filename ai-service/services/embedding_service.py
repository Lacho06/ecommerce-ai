import logging
from sentence_transformers import SentenceTransformer

from config.settings import settings

logger = logging.getLogger(__name__)


class EmbeddingService:
    def __init__(self):
        self._model: SentenceTransformer | None = None

    def load_model(self):
        logger.info("Loading embedding model: %s", settings.embedding_model)
        self._model = SentenceTransformer(settings.embedding_model)
        logger.info("Embedding model loaded successfully")

    @property
    def model(self) -> SentenceTransformer:
        if self._model is None:
            raise RuntimeError("Embedding model not loaded. Call load_model() first.")
        return self._model

    def embed_text(self, text: str) -> list[float]:
        embedding = self.model.encode(text, normalize_embeddings=True)
        return embedding.tolist()

    def embed_batch(self, texts: list[str]) -> list[list[float]]:
        embeddings = self.model.encode(texts, normalize_embeddings=True, batch_size=32)
        return embeddings.tolist()

    def build_product_text(self, product: dict) -> str:
        categories = ", ".join(
            c.get("name", "") for c in product.get("categories", [])
        )
        tags = ", ".join(t.get("name", "") for t in product.get("tags", []))
        currency_code = ""
        if product.get("currency"):
            currency_code = product["currency"].get("code", "")

        parts = [
            product.get("name", ""),
            f"Marca: {product.get('brand', '')}",
            f"Precio: {product.get('basePrice', '')} {currency_code}",
        ]
        if categories:
            parts.append(f"Categorias: {categories}")
        if tags:
            parts.append(f"Tags: {tags}")
        if product.get("description"):
            parts.append(product["description"])

        return ". ".join(parts)


embedding_service = EmbeddingService()
