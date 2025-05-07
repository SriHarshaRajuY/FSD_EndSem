const mongoose = require('mongoose');

// Connect to MongoDB with better error handling
mongoose.connect('mongodb://localhost:27017/gardenly', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Successfully connected to MongoDB');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit if we can't connect to the database
});

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    expertise: { type: String },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true }
});

// Product Schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String, default: 'General' },
    image: { type: String },
    seller_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    quantity: { type: Number, default: 0 },
    sold: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now },
    sold_at: { type: Date }
});

// Ticket Schema
const ticketSchema = new mongoose.Schema({
    requester: { type: String, required: true },
    subject: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: 'Open' },
    expert_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    created_at: { type: Date, default: Date.now }
});

// Create models
const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
const Ticket = mongoose.model('Ticket', ticketSchema);

// Default users data
const defaultUsers = [
    { username: 'admin', password: 'admin123', role: 'Admin', expertise: null, email: 'admin@example.com', mobile: '1234567890' },
    { username: 'seller1', password: 'seller123', role: 'Seller', expertise: null, email: 'seller1@example.com', mobile: '2345678901' },
    { username: 'buyer1', password: 'buyer123', role: 'Buyer', expertise: null, email: 'buyer1@example.com', mobile: '3456789012' },
    { username: 'admin2', password: 'admin456', role: 'Admin', expertise: null, email: 'admin2@example.com', mobile: '4567890123' },
    { username: 'seller2', password: 'seller789', role: 'Seller', expertise: null, email: 'seller2@example.com', mobile: '5678901234' },
    { username: 'seller3', password: 'seller101', role: 'Seller', expertise: null, email: 'seller3@example.com', mobile: '6789012345' },
    { username: 'buyer2', password: 'buyer456', role: 'Buyer', expertise: null, email: 'buyer2@example.com', mobile: '7890123456' },
    { username: 'buyer3', password: 'buyer789', role: 'Buyer', expertise: null, email: 'buyer3@example.com', mobile: '8901234567' },
    { username: 'delivery1', password: 'delivery123', role: 'Delivery Manager', expertise: null, email: 'delivery1@example.com', mobile: '9012345678' },
    { username: 'expert1', password: 'expert123', role: 'Expert', expertise: 'General', email: 'expert1@example.com', mobile: '0123456789' },
    { username: 'expert2', password: 'expert456', role: 'Expert', expertise: 'Technical', email: 'expert2@example.com', mobile: '1234509876' },
    { username: 'expert3', password: 'expert789', role: 'Expert', expertise: 'Billing', email: 'expert3@example.com', mobile: '2345098761' }
];

// Default products data
const defaultProducts = [
    { 
        name: 'Peace Lily, Spathiphyllum - Plant', 
        description: 'The Peace Lily, scientifically known as Spathiphyllum, is a stunning houseplant celebrated for its elegant white blooms and lush green foliage. Native to the tropical rainforests of Central and South America, this plant thrives in low-light conditions, making it an ideal choice for indoor spaces.', 
        price: 165.00, 
        category: 'Plants', 
        image: './public/images/plantspics/p1.png', 
        quantity: 20, 
        sold: 5
    },
    { 
        name: 'Parijat Tree, Parijatak, Night Flowering Jasmine - Plant', 
        description: 'The Parijat tree, also called Night-Flowering Jasmine or Coral Jasmine, is known for its nocturnal blooms that spread a sweet, floral aroma. Revered in Indian mythology, it symbolizes love, devotion, and resilience. Its fragrant white flowers with orange centers bloom at night and fall gracefully by morning.', 
        price: 259.00, 
        category: 'Plants', 
        image: './public/images/plantspics/p2.png', 
        quantity: 15, 
        sold: 3
    },
    { 
        name: 'Raat Ki Rani, Raat Rani, Night Blooming Jasmine - Plant', 
        description: 'Raat Ki Rani (*Cestrum nocturnum*), also known as Night Blooming Jasmine, is a fragrant shrub native to the Caribbean and Central America. This captivating plant produces small, tubular white flowers that only bloom after dusk. The flowers release a potent, sweet fragrance that fills the air, making it a favorite for evening gardens.', 
        price: 499.00, 
        category: 'Plants', 
        image: './public/images/plantspics/p3.png', 
        quantity: 10, 
        sold: 2
    },
    { 
        name: 'Damascus Rose, Scented Rose (Any Color) - Plant', 
        description: 'The Damascus Rose, also known as Rosa damascena, is a timeless symbol of beauty and romance. Renowned for its exquisite fragrance and delicate petals, this plant produces stunning blooms in various colors, making it a favorite among gardeners and floral enthusiasts alike. Historically cherished for its essential oils, the Damascus Rose.', 
        price: 475.00, 
        category: 'Plants', 
        image: './public/images/plantspics/p4.png', 
        quantity: 0, 
        sold: 4
    },
    { 
        name: 'Rosemary - Plant', 
        description: 'Rosemary (Rosmarinus officinalis) is a fragrant evergreen herb native to the Mediterranean region. Known for its needle-like leaves and woody stems, this versatile plant is not only a culinary delight but also a symbol of remembrance and fidelity. With its rich aroma and robust flavor, rosemary enhances a variety of dishes, making it a staple in kitchens worldwide.', 
        price: 799.00, 
        category: 'Plants', 
        image: './public/images/plantspics/p5.png', 
        quantity: 12, 
        sold: 1
    },
    { 
        name: 'Rhoeo Plant, Rhoeo discolor (Tricolor, Variegated) - Plant', 
        description: 'The Rhoeo discolor, commonly known as the Tricolor or Variegated Rhoeo, is a stunning perennial plant native to the tropical regions of Mexico and the Caribbean. With its striking green, white, and purple leaves, this plant adds a vibrant touch to any indoor or outdoor space. Known for its resilience.', 
        price: 999.00, 
        category: 'Plants', 
        image: './public/images/plantspics/p6.png', 
        quantity: 8, 
        sold: 0
    },
    { 
        name: 'Madhumalti Dwarf, Rangoon Creeper - Plant', 
        description: 'The Madhumalti Dwarf, also known as the Rangoon Creeper (Quisqualis indica), is a stunning perennial vine that enchants with its fragrant, tubular flowers that transition from white to pink and finally to red. This versatile plant is perfect for gardens, balconies, and trellises, adding a touch of tropical elegance to any space.', 
        price: 475.00, 
        category: 'Plants', 
        image: './public/images/plantspics/p7.png', 
        quantity: 15, 
        sold: 2
    },
    { 
        name: 'Lemon Grass - Plant', 
        description: 'Lemon Grass (Cymbopogon citratus) is a tropical perennial grass known for its aromatic leaves and culinary versatility. This vibrant green plant thrives in warm climates and is a staple in many Asian cuisines, imparting a refreshing citrus flavor to dishes. Beyond its culinary uses, Lemon Grass is also celebrated for its medicinal properties, making it a valuable addition to any herb garden.', 
        price: 475.00, 
        category: 'Plants', 
        image: './public/images/plantspics/p8.png', 
        quantity: 20, 
        sold: 3
    },
    { 
        name: 'Money Plant Golden', 
        description: 'A beautiful low-maintenance plant that brings prosperity.', 
        price: 10.00, 
        category: 'Plants', 
        image: './public/images/new-products/p6.jpg', 
        quantity: 20, 
        sold: 15
    },
    { 
        name: 'Growing round Plastic pot', 
        description: 'Durable plastic pot perfect for small plants.', 
        price: 10.00, 
        category: 'Pots', 
        image: './public/images/new-products/p7.jpg', 
        quantity: 15, 
        sold: 12
    },
    { 
        name: 'Spinach Seeds', 
        description: 'High-quality seeds for growing fresh spinach.', 
        price: 5.00, 
        category: 'Seeds', 
        image: './public/images/new-products/p5.jpg', 
        quantity: 50, 
        sold: 30
    },
    { 
        name: 'Pruning Secateur', 
        description: 'Sharp tool for precise plant pruning.', 
        price: 10.00, 
        category: 'Tools', 
        image: './public/images/new-products/p1.jpg', 
        quantity: 0, 
        sold: 8
    },
    { 
        name: 'Onex Pebbles - 1Kg', 
        description: 'Decorative pebbles for garden aesthetics.', 
        price: 10.00, 
        category: 'Pebbles', 
        image: './public/images/new-products/p3.jpg', 
        quantity: 30, 
        sold: 25
    },
    { 
        name: 'Parijat Tree', 
        description: 'Fragrant flowering tree for your garden.', 
        price: 10.00, 
        category: 'Plants', 
        image: './public/images/new-products/p4.jpg', 
        quantity: 10, 
        sold: 5
    },
    { 
        name: 'Fungo Gaurd - 500ml', 
        description: 'Fungicide to protect plants from fungal diseases.', 
        price: 10.00, 
        category: 'Fertilizers', 
        image: './public/images/new-products/p2.jpg', 
        quantity: 25, 
        sold: 20
    },
    { 
        name: 'Coco Husk Block - 5kg', 
        description: 'Natural growing medium for healthy plants.', 
        price: 10.00, 
        category: 'Fertilizers', 
        image: './public/images/new-products/p8.jpg', 
        quantity: 12, 
        sold: 10
    }
];

// Initialize database with default data
async function initializeDatabase() {
    try {
        console.log('Starting database initialization...');
        
        // Clear existing collections
        await User.deleteMany({});
        console.log('Cleared users collection');
        
        await Product.deleteMany({});
        console.log('Cleared products collection');
        
        await Ticket.deleteMany({});
        console.log('Cleared tickets collection');

        // Insert default users
        const users = await User.insertMany(defaultUsers);
        console.log('Default users inserted:', users.length);

        // Update seller_id in default products
        const seller = users.find(u => u.username === 'seller1');
        if (!seller) {
            throw new Error('Default seller not found');
        }

        const updatedProducts = defaultProducts.map(product => ({
            ...product,
            seller_id: seller._id,
            sold_at: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000)
        }));

        // Insert default products
        const products = await Product.insertMany(updatedProducts);
        console.log('Default products inserted:', products.length);

        console.log('Database initialization completed successfully');
        return true;
    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
}

module.exports = {
    User,
    Product,
    Ticket,
    initializeDatabase
};