import logging

from providers.gemini_provider import gemini_provider
from providers.groq_provider import groq_provider

logger = logging.getLogger(__name__)


class LLMService:
    """
    Abstraction layer for text generation.
    Strategy: try Groq first (fastest, 70B quality). Fall back to Gemini on
    rate limit or error. Raises RuntimeError if both providers fail.
    """

    async def generate(
        self,
        prompt: str,
        system_prompt: str = "",
        max_tokens: int = 1024,
        temperature: float = 0.7,
    ) -> tuple[str, str]:
        """
        Returns (generated_text, provider_name).
        """
        if groq_provider.is_available:
            result = await groq_provider.generate_with_rate_limit_handling(
                prompt, system_prompt, max_tokens, temperature
            )
            if result is not None:
                logger.info("Text generated via Groq")
                return result, "groq"

        if gemini_provider.is_available:
            result = await gemini_provider.generate_with_rate_limit_handling(
                prompt, system_prompt, max_tokens, temperature
            )
            if result is not None:
                logger.info("Text generated via Gemini (fallback)")
                return result, "gemini"

        raise RuntimeError(
            "All LLM providers failed or are unavailable. "
            "Check GROQ_API_KEY and GEMINI_API_KEY."
        )


llm_service = LLMService()
