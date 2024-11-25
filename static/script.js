document.getElementById("experiment-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const form = event.target;
    const submitButton = form.querySelector("button[type='submit']");
    const loadingDiv = document.getElementById("loading");
    const resultsDiv = document.getElementById("results");
    const resultImg = document.getElementById("result_gif");

    // Get form values
    const activation = document.getElementById("activation").value;
    const lr = parseFloat(document.getElementById("lr").value);
    const stepNum = parseInt(document.getElementById("step_num").value);

    // Basic validation
    if (lr <= 0 || lr > 1) {
        alert("Learning rate should be between 0 and 1");
        return;
    }

    if (stepNum <= 0 || stepNum > 10000) {
        alert("Number of steps should be between 1 and 10000");
        return;
    }

    // Show loading state
    submitButton.disabled = true;
    loadingDiv.style.display = "block";
    resultsDiv.style.display = "none";
    resultImg.style.display = "none";

    // Update activation function display
    document.getElementById("loading-activation").textContent = activation;
    
    // Setup step counter
    const totalStepsSpan = document.getElementById("total-steps");
    const currentStepSpan = document.getElementById("current-step");
    totalStepsSpan.textContent = stepNum;
    currentStepSpan.textContent = "0";

    // Start progress counter with time-based increments
    let currentStep = 0;
    const startTime = Date.now();
    const stepInterval = setInterval(() => {
        // Calculate expected progress based on time (10 steps per second)
        const elapsedSeconds = (Date.now() - startTime) / 1000;
        const expectedProgress = Math.floor(elapsedSeconds * 10);
        
        // Add some randomness to make it look more natural
        const variance = Math.random() * 2 - 1; // Random value between -1 and 1
        currentStep = Math.floor(expectedProgress + variance);
        
        // Ensure we never exceed the target
        if (currentStep >= stepNum) {
            currentStep = stepNum - Math.max(1, Math.floor(stepNum * 0.01));
        }
        
        currentStepSpan.textContent = currentStep;
    }, 100);

    try {
        const response = await fetch("/run_experiment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                activation: activation,
                lr: lr,
                step_num: stepNum
            })
        });

        const data = await response.json();

        if (data.result_gif) {
            // Add timestamp to prevent browser caching
            resultImg.src = `/${data.result_gif}?t=${Date.now()}`;
            resultImg.style.display = "block";
            resultsDiv.style.display = "block";
        } else {
            alert("Error: No visualization was generated");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while running the experiment");
    } finally {
        // Clear the step interval
        clearInterval(stepInterval);
        // Set final step count
        setTimeout(() => {
            currentStepSpan.textContent = stepNum;
            submitButton.disabled = false;
            loadingDiv.style.display = "none";
        }, 500);
    }
});