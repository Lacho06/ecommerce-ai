import logging

import google.generativeai as genai
from google.api_core.exceptions import ResourceExhausted

from config.constants import GEMINI_MODEL
from config.settings import settings

logger = logging.getLogger(__name__)


class GeminiProvider:
    def __init__(self):
        self._configured = False

    def _ensure_configured(self):
        if not self._configured:
            if not settings.gemini_api_key:
                raise RuntimeError("GEMINI_API_KEY is not set")
            genai.configure(api_key=settings.gemini_api_key)
            self._configured = True

    @property
    def is_available(self) -> bool:
        return bool(settings.gemini_api_key)

    async def generate(
        self,
        prompt: str,
        system_prompt: str = "",
        max_tokens: int = 1024,
        temperature: float = 0.7,
    ) -> str:
        self._ensure_configured()
        model = genai.GenerativeModel(
            model_name=GEMINI_MODEL,
            system_instruction=system_prompt or None,
        )
        response = await model.generate_content_async(
            prompt,
            generation_config=genai.GenerationConfig(
                max_output_tokens=max_tokens,
                temperature=temperature,
            ),
        )
        return response.text

    async def generate_with_image(
        self,
        prompt: str,
        image_bytes: bytes,
        mime_type: str = "image/jpeg",
        system_prompt: str = "",
        max_tokens: int = 1024,
    ) -> str:
        self._ensure_configured()
        model = genai.GenerativeModel(
            model_name=GEMINI_MODEL,
            system_instruction=system_prompt or None,
        )
        image_part = {"mime_type": mime_type, "data": image_bytes}
        response = await model.generate_content_async(
            [image_part, prompt],
            generation_config=genai.GenerationConfig(
                max_output_tokens=max_tokens,
            ),
        )
        return response.text

    async def generate_with_rate_limit_handling(
        self,
        prompt: str,
        system_prompt: str = "",
        max_tokens: int = 1024,
        temperature: float = 0.7,
    ) -> str | None:
        try:
            return await self.generate(prompt, system_prompt, max_tokens, temperature)
        except ResourceExhausted:
            logger.error("Gemini rate limit reached. No more fallbacks available.")
            return None
        except Exception as e:
            logger.error("Gemini generation failed: %s", e)
            return None


gemini_provider = GeminiProvider()
