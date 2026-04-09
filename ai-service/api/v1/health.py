from fastapi import APIRouter

from models.schemas import HealthResponse
from services.embedding_service import embedding_service
from services.milvus_service import milvus_service

router = APIRouter(tags=["health"])


@router.get("/health", response_model=HealthResponse)
async def health_check():
    return HealthResponse(
        status="ok",
        milvus_connected=milvus_service.is_connected,
        embedding_model_loaded=embedding_service._model is not None,
    )
