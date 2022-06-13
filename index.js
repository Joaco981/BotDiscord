const {Client, Intents, Collection} = require('discord.js')
require('dotenv').config()
const config = require('./config.json')
const i18n = require('i18n')
const fs = require('fs')

const client = new Client({ intents: [Intents.FLAGS.GUILDS]})

client.commands = new Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.data.name, command)
}

client.once('ready', () =>{
    console.log('Bot is ready')
})

client.on('interactionCreate', async interaction =>{
    if (!interaction.isCommand()) return

    const command = client.commands.get(interaction.commandName)
    if (!command) return

    try{
        await command.execute(interaction)
    }catch(e){
        console.error(e)
        return interaction.reply({ content: "Surgio un error porque te olvidaste algo gil." })
    }




    // const { commandName } = interaction
    // if (commandName == 'pìng'){
    //     await interaction.reply('Pong!');
    // }
})

//client.login(process.env.token)
client.login(config.token)