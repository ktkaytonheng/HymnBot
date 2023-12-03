import fs from 'node:fs';
import path from 'node:path';
import { REST, Routes, Client, GatewayIntentBits } from 'discord.js';
import * as dotenv from 'dotenv';

dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

const rest = new REST({ version: '10' }).setToken(BOT_TOKEN);

const commands = [
	{
		name: 'ping',
		description: 'Replies with Pong!',
	},
];

try {
	console.log('Started refreshing application (/) commands.');

	await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

	console.log('Successfully reloaded application (/) commands.');

	const client = new Client({ intents: [GatewayIntentBits.Guilds] });
	client.on('ready', () => {
		console.log(`Logged in as ${client.user.tag}`);
	});

	client.login(BOT_TOKEN);
} catch (error) {
	console.error(error);
}