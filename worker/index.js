const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
	host: keys.redisHost,
	port: keys.redisPort,
	retry_strategy: () => 1000,
});

const sub = redisClient.duplicate();

const calcFib = (index) => {
	if (index < 2) return 1;

	return calcFib(index - 1) + calcFib(index - 2);
};

sub.on('message', (channel, message) => {
	redisClient.hset('values', message, calcFib(parseInt(message)));
});

sub.subscribe('insert');
