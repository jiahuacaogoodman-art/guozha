import type { ChatboxProps } from './types'

export * from './types'

export interface ChatboxController {
	update: (props: ChatboxProps) => void
	destroy: () => void
}

export declare function mount(
	el: Element,
	props: ChatboxProps,
): ChatboxController