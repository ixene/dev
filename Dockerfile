FROM ubuntu:22.04

RUN apt update && apt install -y python3 python3-pip

WORKDIR /app
COPY . /app

RUN pip install -r requirements.txt

CMD ["uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "8080"]
