const { ObjectId } = require("mongodb");

const ProductService = require("./product.service");

class CartService {
    constructor(client) {
        this.Cart = client.db().collection("cart");
        this.productService = new ProductService(client);
        // this.client = client;
    }

    async addToCart(userId, productId, quantity = 1) {
        if (!ObjectId.isValid(userId) || !ObjectId.isValid(productId)) {
            throw new Error("Invalid userId or productId");
        }

        const filter = { userId: new ObjectId(userId) };
        const cart = await this.Cart.findOne(filter);

        if (!cart) {
            // Nếu chưa có giỏ hàng
            const newCart = {
                userId: new ObjectId(userId),
                items: [{ productId: new ObjectId(productId), quantity: quantity }],
            };

            const result = await this.Cart.insertOne(newCart);
            return result.ops[0];
        }

        const existingItemIndex = cart.items.findIndex(item => item.productId.equals(new ObjectId(productId)));

        if (existingItemIndex === -1) {
            // Nếu sản phẩm chưa tồn tại, thêm mới vào giỏ hàng
            const update = {
                $addToSet: {
                    items: {
                        productId: new ObjectId(productId),
                        quantity: quantity,
                    },
                },
            };

            const result = await this.Cart.findOneAndUpdate(filter, update, { returnDocument: "after" });

            return result.value;
        }

        // Nếu sản phẩm đã tồn tại
        const updatedQuantity = cart.items[existingItemIndex].quantity + quantity;
        const update = {
            $set: { [`items.${existingItemIndex}.quantity`]: updatedQuantity },
        };

        const result = await this.Cart.findOneAndUpdate(filter, update, { returnDocument: "after" });

        return result.value;
    }

    async getCart(userId) {
        const filter = { userId: ObjectId.isValid(userId) ? new ObjectId(userId) : null };
        const cart = await this.Cart.findOne(filter);

        if (cart) {

            const populatedCart = await this.populateCart(cart);
            return populatedCart;
        }

        return null;
    }
    async populateCart(cart) {
        const productIds = cart.items.map(item => item.productId);
    
        try {
            // Lấy thông tin đầy đủ của sản phẩm từ ProductService
            const products = await this.productService.find({ _id: { $in: productIds } });
    
            const populatedCart = {
                ...cart,
                items: cart.items.map(item => {
                    // Tìm sản phẩm tương ứng trong danh sách sản phẩm
                    const product = products.find(product => product._id.toString() === item.productId.toString());
    
                    // Nếu tìm thấy sản phẩm, thêm thông tin hình ảnh và giá vào item
                    if (product) {
                        return {
                            ...item,
                            product: {
                                _id: product._id,
                                name: product.name,
                                price: product.price,
                                img: product.img, // Thêm thông tin hình ảnh vào item
                            }
                        };
                    } else {
                        // Nếu không tìm thấy sản phẩm, trả về item như cũ
                        return item;
                    }
                })
            };
    
            return populatedCart;
        } catch (error) {
            // Xử lý lỗi khi không thể lấy thông tin sản phẩm từ ProductService
            console.error("Lỗi khi lấy thông tin sản phẩm từ ProductService:", error);
            return cart; // Trả về cart nhưng không bổ sung thông tin về sản phẩm
        }
    }

    async updateQuantity(userId, productId, quantity) {
        const filter = {
            userId: ObjectId.isValid(userId) ? new ObjectId(userId) : null,
            "items.productId": ObjectId.isValid(productId) ? new ObjectId(productId) : null
        };

        const update = {
            $set: { "items.$.quantity": quantity }
        };

        const result = await this.Cart.findOneAndUpdate(
            filter,
            update,
            { returnDocument: "after" }
        );

        return result.value;
    }

    async deleteAll(userId) {
        const filter = { userId: ObjectId.isValid(userId) ? new ObjectId(userId) : null };

        const result = await this.Cart.findOneAndDelete(filter);

        return result.value;
    }

    async removeItem(userId, productId) {
        const filter = {
            userId: ObjectId.isValid(userId) ? new ObjectId(userId) : null
        };

        const update = {
            $pull: { items: { productId: ObjectId.isValid(productId) ? new ObjectId(productId) : null } }
        };

        const result = await this.Cart.findOneAndUpdate(
            filter,
            update,
            { returnDocument: "after" }
        );

        return result.value;
    }
}

module.exports = CartService;
