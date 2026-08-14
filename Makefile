install:
	cd backend && poetry install --no-root

run:
	cd backend && poetry run uvicorn main:app --reload