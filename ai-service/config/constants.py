# Milvus collections
PRODUCT_EMBEDDINGS_COLLECTION = "product_embeddings"
CHAT_KNOWLEDGE_COLLECTION = "chat_knowledge"

# Embedding dimensions (all-MiniLM-L6-v2)
VECTOR_DIM = 384

# Milvus index params
INDEX_TYPE = "IVF_FLAT"
INDEX_NLIST = 128
METRIC_TYPE = "COSINE"

# Search defaults
DEFAULT_TOP_K = 5

# Groq model
GROQ_MODEL = "llama-3.3-70b-versatile"

# Gemini model
GEMINI_MODEL = "gemini-2.0-flash"
