import logging
import mimetypes

import httpx

from providers.gemini_provider import gemini_provider

logger = logging.getLogger(__name__)

VISION_SYSTEM_PROMPT = (
    "You are a product image analyst. Describe what you see in the image concisely: "
    "materials, colors, shapes, style, and any distinguishing features relevant to the product. "
    "Be objective and specific. Do not make up information not visible in the image."
)


class VisionService:
    async def describe_image_from_url(
        self, image_url: str, context_prompt: str = ""
    ) -> str | None:
        try:
            async with httpx.AsyncClient(timeout=20.0) as client:
                response = await client.get(image_url)
                response.raise_for_status()
                image_bytes = response.content
                mime_type = response.headers.get(
                    "content-type",
                    mimetypes.guess_type(image_url)[0] or "image/jpeg",
                ).split(";")[0]
        except Exception as e:
            logger.warning("Failed to fetch image from URL %s: %s", image_url, e)
            return None

        return await self._describe(image_bytes, mime_type, context_prompt)

    async def describe_image_from_bytes(
        self,
        image_bytes: bytes,
        mime_type: str = "image/jpeg",
        context_prompt: str = "",
    ) -> str | None:
        return await self._describe(image_bytes, mime_type, context_prompt)

    async def _describe(
        self, image_bytes: bytes, mime_type: str, context_prompt: str
    ) -> str | None:
        if not gemini_provider.is_available:
            logger.warning("Gemini not available, skipping image analysis")
            return None

        prompt = context_prompt or "Describe this product image in detail."
        try:
            result = await gemini_provider.generate_with_image(
                prompt=prompt,
                image_bytes=image_bytes,
                mime_type=mime_type,
                system_prompt=VISION_SYSTEM_PROMPT,
                max_tokens=512,
            )
            logger.info("Image described successfully via Gemini Vision")
            return result
        except Exception as e:
            logger.error("Vision analysis failed: %s", e)
            return None


vision_service = VisionService()
