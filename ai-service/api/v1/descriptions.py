import logging

from fastapi import APIRouter, HTTPException

from models.schemas import DescriptionGenerateRequest, DescriptionGenerateResponse
from services.description_service import description_service

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/descriptions", tags=["descriptions"])


@router.post("/generate", response_model=DescriptionGenerateResponse)
async def generate_description(request: DescriptionGenerateRequest):
    try:
        result = await description_service.generate_description(
            product_id=request.product_id,
            style=request.style,
        )
        return DescriptionGenerateResponse(**result)
    except Exception as e:
        logger.error("Description generation failed: %s", e)
        raise HTTPException(status_code=500, detail=str(e))
