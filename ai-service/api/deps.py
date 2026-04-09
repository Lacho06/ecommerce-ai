from fastapi import Header, HTTPException

from config.settings import settings


async def verify_service_key(x_service_key: str = Header(default="")):
    if settings.ai_service_secret and x_service_key != settings.ai_service_secret:
        raise HTTPException(status_code=403, detail="Invalid service key")
