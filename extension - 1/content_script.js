
// content_script.js

function extractAdsData() {
    const adsData = [];
    const adElements = document.querySelectorAll('.ad'); // Update this selector to target ad elements

    adElements.forEach(ad => {
        let imageData = ad.querySelector('img') ? ad.querySelector('img').src : null;
        let textData = ad.textContent.trim();

        if (imageData || textData) {
            adsData.push({ imageData, textData });
        }
    });

    return adsData;
}

async function analyzeAdData(adsData) {
    let analysisResults = [];
    for (let ad of adsData) {
        if (ad.imageData) {
            let visionData = await sendToGoogleCloudVision(ad.imageData);
            analysisResults.push({ ad: ad, result: determineSpamFromVision(visionData) });
        }
        if (ad.textData) {
            let gpt3Data = await sendToGPT3(ad.textData);
            analysisResults.push({ ad: ad, result: determineSpamFromGPT3(gpt3Data) });
        }
    }
    return analysisResults;
}

function determineSpamFromVision(visionData) {
    // Placeholder logic for determining spam from vision data
    // Replace with actual analysis logic
    return visionData.someCondition ? "Spam" : "Real";
}

function determineSpamFromGPT3(gpt3Data) {
    // Placeholder logic for determining spam from GPT-3 data
    // Replace with actual analysis logic
    return gpt3Data.someCondition ? "Spam" : "Real";
}

function sendToGoogleCloudVision(imageUrl) {
    const apiEndpoint = 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyD_g8ehg2kgB_T9LpDdXNsT7LwyZDvPlBM';
    const requestBody = {
        requests: [
            {
                image: {
                    source: {
                        imageUri: imageUrl
                    }
                },
                features: [
                    { type: "LABEL_DETECTION" },
                    { type: "TEXT_DETECTION" }
                ]
            }
        ]
    };

    return fetch(apiEndpoint, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Google Cloud Vision API response:', data);
        return data; // Return data for further processing
    })
    .catch(error => console.error('Error:', error));
}

function sendToGPT3(textData) {
    const apiEndpoint = 'https://api.openai.com/v1/engines/davinci/completions';
    const requestBody = {
        prompt: textData,
        max_tokens: 100
    };

    return fetch(apiEndpoint, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('OpenAI GPT-3 response:', data);
        return data; // Return data for further processing
    })
    .catch(error => console.error('Error:', error));
}

// Run the script and send results back
const adsData = extractAdsData();
analyzeAdData(adsData).then(results => {
    chrome.runtime.sendMessage({ action: "displayAnalysisResults", data: results });
});
