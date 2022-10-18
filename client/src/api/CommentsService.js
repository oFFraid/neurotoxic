const baseUrl = process.env.REACT_APP_API_BASE_URL

export class CommentsService {
    static async neuroProcessing(id) {
        return fetch(`${baseUrl}/comments/${id}`).then(res => res.json())
    }
}
