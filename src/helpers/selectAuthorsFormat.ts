import { AuthorType } from '../store/authors/types';

export function selectAuthor(
	authorID: string,
	authorsList: AuthorType[] | { authors: AuthorType[] }
): string {
	let authorName = '';
	if ('authors' in authorsList) {
		for (const element of authorsList.authors) {
			if (authorID === element.id) {
				authorName = element.name;
			}
		}
	} else {
		for (const element of authorsList) {
			if (authorID === element.id) {
				authorName = element.name;
			}
		}
	}

	return authorName;
}
