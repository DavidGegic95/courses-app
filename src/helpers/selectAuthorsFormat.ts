import { AuthorType } from '../store/authors/types';

export function selectAuthor(
	authorID: string,
	authorsList: AuthorType[]
): string {
	let authorName = '';

	for (const element of authorsList) {
		if (authorID === element.id) {
			authorName = element.name;
		}
	}

	return authorName;
}
