document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const surveyStartPopup = document.getElementById('survey-start-popup');
    const startSurveyBtn = document.getElementById('start-survey-btn');
    const cancelSurveyBtn = document.getElementById('cancel-survey-btn');
    const chatContainer = document.getElementById('chat-container');
    const chatHistory = document.getElementById('chat-history');

    // Survey Data
    const surveyData = [
        {
            question: "Bạn bao nhiêu tuổi?",
            answers: ["18-24", "25-34", "35-44", "45-54", "55+"],
        },
        {
            question: "Giới tính của bạn là gì?",
            answers: ["Nam", "Nữ", "Khác"],
        },
        {
            question: "Bạn có thường xuyên cảm thấy căng thẳng không?",
            answers: ["Hàng ngày", "Hàng tuần", "Hàng tháng", "Hiếm khi"],
        },
        {
            question: "Bạn sẽ đánh giá chất lượng giấc ngủ của mình như thế nào?",
            answers: ["Tuyệt vời", "Tốt", "Bình thường", "Kém"],
        },
        {
            question: "Bạn có thường xuyên tập thể dục không?",
            answers: ["Hàng ngày", "Vài lần một tuần", "Mỗi tuần một lần", "Hiếm khi/Không bao giờ"],
        },
        {
            question: "Mục tiêu chính của bạn khi sử dụng dịch vụ này là gì?",
            answers: ["Hỗ trợ sức khỏe tinh thần", "Cải thiện bản thân", "Tò mò", "Khác"],
        },
        {
            question: "Bạn thường đối phó với căng thẳng bằng cách nào?",
            answers: ["Nói chuyện với ai đó", "Theo đuổi sở thích", "Tập thể dục", "Không làm gì cả"],
        },
        {
            question: "Trên thang điểm từ 1-5, bạn cởi mở như thế nào với việc thử các kỹ thuật chăm sóc sức khỏe mới?",
            answers: ["1 (Không hề)", "2", "3", "4", "5 (Rất cởi mở)"],
        },
    ];

    let currentQuestionIndex = 0;
    const userAnswers = [];

    // Event Listeners
    startSurveyBtn.addEventListener('click', startSurvey);
    cancelSurveyBtn.addEventListener('click', () => {
        surveyStartPopup.classList.remove('show');
    });
    chatHistory.addEventListener('click', handleQuickReplyClick);

    // Functions
    function startSurvey() {
        surveyStartPopup.classList.remove('show');
        chatContainer.style.display = 'flex';
        addMessage("Xin chào bạn, vui lòng thực hiện chọn câu trả lời cho các câu hỏi sau để hoàn thành bài khảo sát.", 'bot');
        
        setTimeout(() => {
            displayQuestion();
        }, 1000);
    }

    function displayQuestion() {
        // First, remove any existing quick replies
        const existingReplies = chatHistory.querySelector('.quick-replies-container');
        if (existingReplies) {
            existingReplies.remove();
        }

        if (currentQuestionIndex < surveyData.length) {
            const currentQuestion = surveyData[currentQuestionIndex];
            addMessage(currentQuestion.question, 'bot');
            renderQuickReplies(currentQuestion.answers);
        } else {
            finishSurvey();
        }
    }

    function renderQuickReplies(answers) {
        const repliesContainer = document.createElement('div');
        repliesContainer.classList.add('quick-replies-container');
        
        answers.forEach(answer => {
            const button = document.createElement('button');
            button.classList.add('quick-reply-btn');
            button.textContent = answer;
            repliesContainer.appendChild(button);
        });

        chatHistory.appendChild(repliesContainer);
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    function handleQuickReplyClick(e) {
        if (!e.target.classList.contains('quick-reply-btn')) return;

        const selectedAnswer = e.target.textContent;
        userAnswers.push({ question: surveyData[currentQuestionIndex].question, answer: selectedAnswer });

        // Remove the quick replies container
        e.target.closest('.quick-replies-container').remove();

        addMessage(selectedAnswer, 'user');
        
        currentQuestionIndex++;
        
        setTimeout(() => {
            displayQuestion();
        }, 1200);
    }

    function finishSurvey() {
        addMessage("Cảm ơn bạn đã hoàn thành khảo sát. Hệ thống đang phân tích...", 'bot');
        console.log("Survey finished. User answers:", userAnswers);
    }

    function addMessage(text, type) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', `${type}-message`);

        const avatarSrc = type === 'user' ? 'https://i.pravatar.cc/100?u=cameron' : 'img/logochat.png';
        const avatarAlt = type === 'user' ? 'User Avatar' : 'Bot Avatar';

        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');
        messageContent.innerText = text;

        const avatarElement = document.createElement('img');
        avatarElement.src = avatarSrc;
        avatarElement.alt = avatarAlt;
        avatarElement.classList.add('avatar');

        messageElement.appendChild(avatarElement);
        messageElement.appendChild(messageContent);
        
        chatHistory.appendChild(messageElement);
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }
});

