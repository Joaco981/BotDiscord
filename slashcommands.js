//const { SlashCommandBuilder } = require('@discordjs/builders')
const fs = require('fs')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const { clientId, guildId, token } = require('./config.json')

const commands = [ 
    //new SlashCommandBuilder().setName('ping').setDescription('Pingueame esta')
]
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
//.map(command => command.toJSON())

for (const file of commandFiles){
    const command= require(`./commands/${file}`)
    commands.push(command.data.toJSON())
}

const rest = new REST({ version: '9'}).setToken(token)

async function createSlash(){
    try{
        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands }
        )

        console.log('Ando funcando, deja de joder')
    }catch(e) {
        console.error(e)
    }
  
}

createSlash()