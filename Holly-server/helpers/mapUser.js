
export const mapUser = (user) => {
    return {
        name: user.name,
        email: user.email,
        role: user.role,
        id: user._id,
        favorites: user.favorites,
        cart: user.cart
    }
}