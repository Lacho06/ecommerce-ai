from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # Milvus
    milvus_host: str = "milvus"
    milvus_port: int = 19530

    # Backend NestJS
    backend_url: str = "http://backend:3000"

    # AI Providers
    groq_api_key: str = ""
    gemini_api_key: str = ""

    # Embedding model (local, runs on CPU)
    embedding_model: str = "all-MiniLM-L6-v2"

    # Redis
    redis_url: str = "redis://redis:6379/1"

    # Service auth
    ai_service_secret: str = ""

    model_config = {"env_file": ".env", "extra": "ignore"}


settings = Settings()
