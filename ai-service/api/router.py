from fastapi import APIRouter

from api.v1.descriptions import router as descriptions_router
from api.v1.embeddings import router as embeddings_router
from api.v1.health import router as health_router

api_router = APIRouter()

api_router.include_router(health_router)
api_router.include_router(embeddings_router)
api_router.include_router(descriptions_router)
