export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);
  
  try {
    const response = await fetch(`https://api.telegram.org/bot${config.botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: config.chatId,
        text: body.text
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to send message');
    }
    
    return { success: true };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Failed to send message'
    });
  }
}); 