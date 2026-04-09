import logging

import httpx

from config.settings import settings

logger = logging.getLogger(__name__)

_client: httpx.AsyncClient | None = None


def get_client() -> httpx.AsyncClient:
    global _client
    if _client is None:
        _client = httpx.AsyncClient(
            base_url=settings.backend_url,
            headers={"X-Service-Key": settings.ai_service_secret},
            timeout=30.0,
        )
    return _client


async def close_client():
    global _client
    if _client is not None:
        await _client.aclose()
        _client = None


async def get_product(product_id: str) -> dict:
    client = get_client()
    response = await client.get(f"/products/{product_id}")
    response.raise_for_status()
    return response.json()


async def get_all_products(page: int = 1, per_page: int = 100) -> dict:
    client = get_client()
    response = await client.get(
        "/products", params={"page": page, "perPage": per_page}
    )
    response.raise_for_status()
    return response.json()


async def get_product_images(product_id: str) -> list[dict]:
    client = get_client()
    response = await client.get(
        "/images",
        params={"imageableType": "Product", "imageableId": product_id},
    )
    response.raise_for_status()
    return response.json()
