from fastapi import FastAPI

from app.api.routes.items import router as items_router

app = FastAPI(
    title="C216 - Sistemas Distribuidos",
    description="API de gerenciamento de itens",
    version="1.0.0",
)

app.include_router(items_router)
