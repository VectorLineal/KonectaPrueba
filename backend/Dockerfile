FROM node:20


WORKDIR /app

ENV PORT ${PORT:-3001}

# Copy project files to image
COPY . .

# Install dependencies
RUN npm i

# Expose the variable PORT if not defined use 3001
EXPOSE ${PORT:-3001}

CMD npm start

