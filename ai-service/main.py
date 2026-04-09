import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.router import api_router
from services.embedding_service import embedding_service
from services.milvus_service import milvus_service
from utils.http_client import close_client

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("Starting AI Service...")

    embedding_service.load_model()

    try:
        milvus_service.connect()
        milvus_service.ensure_collections()
    except Exception as e:
        logger.error("Failed to connect to Milvus: %s", e)
        logger.warning("AI Service running without Milvus - some features unavailable")

    logger.info("AI Service started successfully")

    yield

    # Shutdown
    logger.info("Shutting down AI Service...")
    milvus_service.disconnect()
    await close_client()
    logger.info("AI Service shutdown complete")


app = FastAPI(
    title="Ecommerce AI Service",
    description="AI microservice for product embeddings, descriptions, chat, and analytics",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)


@app.get("/")
async def root():
    return {"service": "ecommerce-ai", "version": "1.0.0"}
