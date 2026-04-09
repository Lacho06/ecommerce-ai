import logging

from groq import AsyncGroq, RateLimitError

from config.constants import GROQ_MODEL
from config.settings import settings

logger = logging.getLogger(__name__)


class GroqProvider:
    def __init__(self):
        self._client: AsyncGroq | None = None

    @property
    def client(self) -> AsyncGroq:
        if self._client is None:
            if not settings.groq_api_key:
                raise RuntimeError("GROQ_API_KEY is not set")
            self._client = AsyncGroq(api_key=settings.groq_api_key)
        return self._client

    @property
    def is_available(self) -> bool:
        return bool(settings.groq_api_key)

    async def generate(
        self,
        prompt: str,
        system_prompt: str = "",
        max_tokens: int = 1024,
        temperature: float = 0.7,
    ) -> str:
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": prompt})

        response = await self.client.chat.completions.create(
            model=GROQ_MODEL,
            messages=messages,
            max_tokens=max_tokens,
            temperature=temperature,
        )
        return response.choices[0].message.content

    async def generate_with_rate_limit_handling(
        self,
        prompt: str,
        system_prompt: str = "",
        max_tokens: int = 1024,
        temperature: float = 0.7,
    ) -> str | None:
        try:
            return await self.generate(prompt, system_prompt, max_tokens, temperature)
        except RateLimitError:
            logger.warning("Groq rate limit reached, falling back to Gemini")
            return None
        except Exception as e:
            logger.error("Groq generation failed: %s", e)
            return None


groq_provider = GroqProvider()
