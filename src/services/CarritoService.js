import axios from 'axios'

const API_URL = 'http://localhost:8000/api'

const CarritoService = {
  // Obtener el carrito actual
  getCarrito: async () => {
    try {
      const token = localStorage.getItem('access_token')
      const response = await axios.get(`${API_URL}/carrito/mi-carrito`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error) {
      console.error('Error al obtener el carrito:', error)
      throw error
    }
  },

  // Agregar producto al carrito
  agregarProducto: async (productoId, cantidad) => {
    try {
      const token = localStorage.getItem('access_token')
      const response = await axios.post(
        `${API_URL}/carrito/`,
        { producto_id: productoId, cantidad },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      return response.data
    } catch (error) {
      console.error('Error al agregar producto:', error)
      throw error
    }
  },

  // Actualizar cantidad de producto
  actualizarProducto: async (productoId, cantidad) => {
    try {
      const response = await axios.put(
        `${API_URL}/carrito/actualizar`,
        { producto_id: productoId, cantidad },
        { withCredentials: true },
      )
      return response.data
    } catch (error) {
      console.error('Error al actualizar producto:', error)
      throw error
    }
  },

  // Eliminar producto del carrito
  eliminarProducto: async (productoId) => {
    try {
      const token = localStorage.getItem('access_token')
      const response = await axios.delete(`${API_URL}/carrito/producto/${productoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error) {
      console.error('Error al eliminar producto:', error)
      throw error
    }
  },

  // Vaciar el carrito
  vaciarCarrito: async () => {
    try {
      const response = await axios.delete(`${API_URL}/carrito/vaciar`, { withCredentials: true })
      return response.data
    } catch (error) {
      console.error('Error al vaciar el carrito:', error)
      throw error
    }
  },

  // Procesar el pedido
  procesarPedido: async (userId, direccionEnvio) => {
    try {
      const response = await axios.post(
        `${API_URL}/carrito/procesar`,
        {
          user_id: userId,
          direccion_envio: direccionEnvio,
        },
        { withCredentials: true },
      )
      return response.data
    } catch (error) {
      console.error('Error al procesar el pedido:', error)
      throw error
    }
  },
}

export default CarritoService
