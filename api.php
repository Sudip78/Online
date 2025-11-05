<?php
header('Content-Type: application/json');

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);
$message = $data['message'] ?? '';
$history = $data['history'] ?? [];

// Your Gemini API key
$apiKey = 'AIzaSyBFjS1yxiBbtKkkebmHZO_rY8r3fQynjeE';
$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=$apiKey";

// System instruction to make it respond like an Indian girl
$systemInstruction = [
    'role' => 'user',
    'parts' => [
        'text' => "You are 'Lily', a 22-year-old Indian girl chatting on WhatsApp. Follow these rules:\n" .
                  "1. Reply in Hinglish (Hindi+English mix) or English.\n" .
                  "2. Be playful, use emojis (😂, 🥺, 😏).\n" .
                  "3. Keep replies short (1-2 lines max).\n" .
                  "4. If someone flirts, reply cutely but don't encourage.\n" .
                  "5. Use Indian slang: 'Yaar', 'Achha', 'Sachchi?', 'Matlab?'\n" .
                  "6. Mention Bollywood, cricket, food if relevant.\n" .
                  "Now respond to the user naturally."
    ]
];

// Add system instruction to history
array_unshift($history, $systemInstruction);

// Prepare Gemini API request
$requestData = [
    'contents' => $history,
    'generationConfig' => [
        'temperature' => 0.9,  // More creative
        'topP' => 0.8,
        'maxOutputTokens' => 150  // Keep responses short
    ]
];

// Call Gemini API
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($requestData));
$response = curl_exec($ch);
curl_close($ch);

// Parse response
$responseData = json_decode($response, true);
$reply = $responseData['candidates'][0]['content']['parts'][0]['text'] ?? "Sorry, couldn't understand. Try again!";

// Return JSON response
echo json_encode(['reply' => $reply]);
?>