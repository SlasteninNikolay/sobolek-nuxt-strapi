export type LeadModalOpenParams = {
  /**
   * Тип формы (будет сохранён в Strapi как formType)
   * Например: "Оставить заявку", "Бронирование номера", и т.д.
   */
  formType?: string
  /**
   * Источник/контекст (например: "room:<id>")
   */
  source?: string
}

/**
 * Глобальное состояние модалки "Оставить заявку".
 *
 * Используем useState, чтобы можно было открыть модалку из любого компонента
 * (шапка/карточки/блоки) и отрисовать модалку один раз на уровне layout.
 */
export function useLeadModal() {
  const isOpen = useState<boolean>('lead-modal:isOpen', () => false)
  const formType = useState<string>('lead-modal:formType', () => 'Оставить заявку')
  const source = useState<string>('lead-modal:source', () => '')

  const open = (params: LeadModalOpenParams = {}) => {
    formType.value = params.formType || 'Оставить заявку'
    source.value = params.source || ''
    isOpen.value = true
  }

  const close = () => {
    isOpen.value = false
  }

  return {
    isOpen,
    formType,
    source,
    open,
    close,
  }
}
