type BookingModalOpenParams = {
  roomId?: string
}

/**
 * Глобальное состояние модалки бронирования.
 *
 * Используем useState, чтобы можно было открыть модалку из любого компонента
 * (шапка/карточки/блоки) и отрисовать модалку один раз на уровне layout.
 */
export function useBookingModal() {
  const isOpen = useState<boolean>('booking-modal:isOpen', () => false)
  const roomId = useState<string>('booking-modal:roomId', () => '')

  const open = (params: BookingModalOpenParams = {}) => {
    roomId.value = params.roomId || ''
    isOpen.value = true
  }

  const close = () => {
    isOpen.value = false
  }

  return {
    isOpen,
    roomId,
    open,
    close,
  }
}
