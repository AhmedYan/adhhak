import { getAuthUrl, getTokensFromCode } from './services/calendarService.js';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function setupOAuth() {
  console.log('🔐 Configuration OAuth pour Google Calendar API\n');
  
  try {
    // Get authorization URL
    const authUrl = getAuthUrl();
    
    console.log('1. Ouvrez ce lien dans votre navigateur:');
    console.log('\n' + authUrl + '\n');
    console.log('2. Connectez-vous avec votre compte Google (adhhak9@gmail.com)');
    console.log('3. Autorisez l\'application à accéder à votre calendrier');
    console.log('4. Copiez le code d\'autorisation affiché\n');
    
    const code = await question('Collez le code d\'autorisation ici: ');
    
    if (!code || code.trim().length === 0) {
      console.error('❌ Code d\'autorisation invalide');
      process.exit(1);
    }
    
    console.log('\n⏳ Échange du code contre les tokens...');
    
    const tokens = await getTokensFromCode(code.trim());
    
    console.log('\n✅ Configuration réussie!');
    console.log('\n📋 Ajoutez ceci à votre fichier .env:');
    console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`);
    console.log('\n💡 Le token a également été sauvegardé dans token.json');
    
    rl.close();
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ Erreur lors de la configuration:', error.message);
    rl.close();
    process.exit(1);
  }
}

setupOAuth();

