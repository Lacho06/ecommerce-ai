import logging

from services.llm_service import llm_service
from services.vision_service import vision_service
from utils.http_client import get_product, get_product_images
from utils.prompt_templates import (
    DESCRIPTION_SYSTEM_PROMPT,
    build_description_prompt,
)

logger = logging.getLogger(__name__)


class DescriptionService:
    async def generate_description(
        self, product_id: str, style: str = "formal"
    ) -> dict:
        product = await get_product(product_id)
        logger.info("Generating description for product: %s (%s)", product.get("name"), product_id)

        image_description = await self._get_image_description(product_id, product)

        categories = ", ".join(c.get("name", "") for c in product.get("categories", []))
        tags = ", ".join(t.get("name", "") for t in product.get("tags", []))
        currency_code = ""
        if product.get("currency"):
            currency_code = product["currency"].get("code", "")

        prompt = build_description_prompt(
            name=product.get("name", ""),
            brand=product.get("brand", ""),
            base_price=float(product.get("basePrice", 0)),
            currency_code=currency_code,
            categories=categories,
            tags=tags,
            image_description=image_description,
            style=style,
        )

        description, provider = await llm_service.generate(
            prompt=prompt,
            system_prompt=DESCRIPTION_SYSTEM_PROMPT,
            max_tokens=800,
            temperature=0.7,
        )

        return {
            "description": description.strip(),
            "provider_used": provider,
            "style": style,
        }

    async def _get_image_description(
        self, product_id: str, product: dict
    ) -> str | None:
        try:
            images = await get_product_images(product_id)
            if not images:
                logger.info("No images found for product %s", product_id)
                return None

            image_url = images[0].get("url") if isinstance(images[0], dict) else None
            if not image_url:
                return None

            context_prompt = (
                f"This is a product image for '{product.get('name', '')}' "
                f"by brand '{product.get('brand', '')}'. "
                "Describe what you see in detail focusing on product characteristics."
            )
            return await vision_service.describe_image_from_url(image_url, context_prompt)
        except Exception as e:
            logger.warning("Could not get image description for product %s: %s", product_id, e)
            return None


description_service = DescriptionService()
