from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import rc, cl, da1, wt


app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(rc.router)
app.include_router(cl.router)
app.include_router(da1.router)
app.include_router(wt.router)
