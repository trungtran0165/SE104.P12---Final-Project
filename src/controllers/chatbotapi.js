const chatbotService = require('../services/chatbotapi');

const chatbotController = {
    saveMessage: async (req, res) => {
        try {
            const { MaTaiKhoan, TinNhan, RoleTinNhan } = req.body;
            
            // Debug logging
            console.log('Received request body:', req.body);
            
            // Validate MaTaiKhoan
            if (!MaTaiKhoan || typeof MaTaiKhoan !== 'number') {
                return res.status(400).json({ 
                    error: 'MaTaiKhoan must be a number' 
                });
            }

            // Validate TinNhan
            if (!TinNhan || typeof TinNhan !== 'string' || TinNhan.trim() === '') {
                return res.status(400).json({ 
                    error: 'TinNhan must be a non-empty string' 
                });
            }

            // Validate RoleTinNhan
            if (!['user', 'bot'].includes(RoleTinNhan)) {
                return res.status(400).json({ 
                    error: 'RoleTinNhan must be either "user" or "bot"' 
                });
            }

            const result = await chatbotService.saveMessage(
                MaTaiKhoan,
                TinNhan.trim(),
                RoleTinNhan
            );
            
            res.status(200).json(result);
        } catch (error) {
            console.error('Error saving message:', error);
            res.status(500).json({ 
                error: 'Internal server error', 
                message: error.message 
            });
        }
    },

    getMessagesByUser: async (req, res) => {
        try {
            const { MaTaiKhoan } = req.params;
            
            if (!MaTaiKhoan) {
                return res.status(400).json({ 
                    error: 'User ID is required' 
                });
            }

            const messages = await chatbotService.getChatHistory(parseInt(MaTaiKhoan));
            res.status(200).json(messages);
        } catch (error) {
            console.error('Error getting messages:', error);
            res.status(500).json({ 
                error: 'Internal server error', 
                message: error.message 
            });
        }
    }
};

module.exports = chatbotController;
