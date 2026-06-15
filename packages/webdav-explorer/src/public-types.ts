type MaybePromise<T> = Promise<T> | T

export interface FileStat {
	path: string
	basename: string
	isDir: boolean
}

export interface WebDAVExplorerFileSystem {
	ls: (path: string) => MaybePromise<FileStat[]>
	mkdirs: (path: string) => MaybePromise<void>
}

export interface AppProps {
	fs: WebDAVExplorerFileSystem
	onConfirm: (path: string) => void
	onClose: () => void
}

export declare function mount(el: Element, props: AppProps): () => void