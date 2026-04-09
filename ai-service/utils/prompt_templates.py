DESCRIPTION_SYSTEM_PROMPT = (
    "You are an expert e-commerce copywriter. "
    "Write compelling, accurate product descriptions based on the product data and image analysis provided. "
    "Never invent specifications not present in the data. "
    "Write in the same language as the product name unless instructed otherwise."
)


def build_description_prompt(
    name: str,
    brand: str,
    base_price: float,
    currency_code: str,
    categories: str,
    tags: str,
    image_description: str | None,
    style: str,
) -> str:
    style_instructions = {
        "formal": (
            "Write a professional, detailed product description (2-3 paragraphs). "
            "Highlight quality, materials, and key features. Suitable for a B2B or premium retail context."
        ),
        "casual": (
            "Write a friendly, conversational product description (1-2 short paragraphs). "
            "Use an approachable tone that connects with everyday shoppers. Keep it concise and engaging."
        ),
        "seo": (
            "Write an SEO-optimized product description (2 paragraphs + a bullet list of key features). "
            "Naturally include the product name, brand, and category as keywords. "
            "Start with a compelling hook sentence."
        ),
    }

    image_section = ""
    if image_description:
        image_section = f"\n\nImage Analysis:\n{image_description}"

    return f"""Product Data:
- Name: {name}
- Brand: {brand}
- Price: {base_price} {currency_code}
- Categories: {categories or 'N/A'}
- Tags: {tags or 'N/A'}
{image_section}

Style Instructions:
{style_instructions.get(style, style_instructions['formal'])}

Generate the product description now:"""


# --- WhatsApp Chat (Phase 3) ---

def build_whatsapp_system_prompt(store_name: str = "our store") -> str:
    return (
        f"You are a helpful customer service assistant for {store_name}. "
        "You help customers find products, answer questions about orders, shipping, and policies. "
        "Only recommend products that exist in the catalog provided. "
        "Never invent prices, availability, or specifications. "
        "Be concise — WhatsApp messages should be short and friendly. "
        "If the customer asks to speak with a human or the query is a complaint you cannot resolve, "
        "respond with the tag [HANDOFF] at the start of your message."
    )


def build_rag_chat_prompt(
    user_message: str,
    relevant_products: list[dict],
    conversation_history: list[dict],
) -> str:
    history_text = ""
    if conversation_history:
        history_lines = []
        for msg in conversation_history[-6:]:
            role = "Customer" if msg["role"] == "user" else "Assistant"
            history_lines.append(f"{role}: {msg['content']}")
        history_text = "\n".join(history_lines) + "\n\n"

    products_text = ""
    if relevant_products:
        product_lines = []
        for p in relevant_products:
            line = f"- {p.get('name', 'N/A')} (Brand: {p.get('brand', 'N/A')}, Price: {p.get('base_price', 'N/A')})"
            product_lines.append(line)
        products_text = "Relevant products from catalog:\n" + "\n".join(product_lines) + "\n\n"

    return f"{history_text}{products_text}Customer: {user_message}\nAssistant:"


# --- Analytics (Phase 4) ---

def build_growth_strategy_prompt(metrics: dict) -> str:
    return f"""You are a senior business growth consultant specializing in e-commerce.

Business Metrics:
{_format_metrics(metrics)}

Based on these metrics, provide a structured growth strategy. Return a JSON object with:
{{
  "summary": "2-3 sentence overview of the current business state",
  "top_opportunities": ["list of 3-5 specific growth opportunities"],
  "recommended_actions": [
    {{"action": "...", "rationale": "...", "priority": "high|medium|low"}}
  ],
  "risks_to_monitor": ["list of 2-3 risks"]
}}

Respond only with the JSON object, no additional text."""


def build_marketing_campaign_prompt(
    objective: str,
    target_audience: str,
    budget_range: str,
    top_products: list[dict],
) -> str:
    products_text = ""
    if top_products:
        products_text = "Top products to promote:\n" + "\n".join(
            f"- {p.get('name')} ({p.get('brand')})" for p in top_products[:5]
        )

    return f"""You are an expert digital marketing strategist for e-commerce.

Campaign Brief:
- Objective: {objective or 'Increase sales'}
- Target Audience: {target_audience or 'General shoppers'}
- Budget Range: {budget_range or 'Not specified'}
{products_text}

Create a marketing campaign plan. Return a JSON object with:
{{
  "campaign_name": "...",
  "tagline": "...",
  "channels": [
    {{"channel": "...", "strategy": "...", "content_ideas": ["..."]}}
  ],
  "messaging": {{
    "primary_message": "...",
    "value_proposition": "...",
    "call_to_action": "..."
  }},
  "timeline": "suggested campaign duration and phases",
  "kpis": ["list of 3-4 KPIs to track"]
}}

Respond only with the JSON object, no additional text."""


def _format_metrics(metrics: dict) -> str:
    lines = []
    for key, value in metrics.items():
        lines.append(f"- {key.replace('_', ' ').title()}: {value}")
    return "\n".join(lines)
