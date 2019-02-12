FROM python:3.6

RUN mkdir /home/dataplay
ADD server/dataplay /home/dataplay
ADD client/dist /home/dataplay/static
COPY server/requirements-linux.txt /home/

RUN cd /home && \
    pip install --upgrade pip && \
    pip install -r requirements-linux.txt

WORKDIR /home
EXPOSE 5000

CMD ["python","-m","dataplay.server"]
