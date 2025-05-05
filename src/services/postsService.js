export async function inserirPost(formulario, imagem) {
    const formData = new FormData;

    formData.append('titulo', formulario.titulo);
    formData.append('subtitulo', formulario.subtitulo);
    formData.append('conteudo', formulario.conteudo);
    formData.append('slug', formulario.slug);
    formData.append('autor_id', formulario.autor_id);
    formData.append('categoria', formulario.categoria);
    formData.append('imagem', imagem);

    const url = 'https://apicaioemns.42web.io/backend/api/posts/insertPost.php';
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        })
        const result = await response.json();
        // console.log(result);
        if (result) {
            // console.log(result.status);
            // console.log(result.message);
            return result;
        }
    } catch {
        return { 'status': 'error', 'message': 'Erro ao realizar a requisição', 'codigo': '' };
    }

}

export async function buscarNoticia(slugRecebido) {
    try {
        const formData = new FormData();
        formData.append('slug', slugRecebido);

        const url = 'https://apicaioemns.42web.io/backend/api/posts/buscarPorSlug.php';
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        if (result) {
            return result;
        } else {
            return {
                'status': 'error',
                'message': 'Erro ao receber a resposta',
                'codigo': ''
            };
        }
    } catch {
        return {
            'status': 'error',
            'message': 'Erro ao fazer a requisição',
            'codigo': ''
        }
    }
}

export async function listNews() {
    try {
        const url = 'https://apicaioemns.42web.io/backend/api/posts/listNews.php'
        const response = await fetch(url, {
            method: 'GET'
        })
        const result = response.json();
        if(result) {
            return result;
        }
    } catch {
        return {
            'status': 'error',
            'message': 'Requisição não executada',
            'codigo': ''
        }
    }
}

export async function atualizarPost(slug, formulario, imagem) {
    formulario.append('slug', slug);
    if (imagem) {
        formulario.append('imagem', imagem);
    }

    const url = 'https://apicaioemns.42web.io/backend/api/posts/editPost.php';   
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formulario,
        })
        const result = await response.json();
        console.log(result);
        if (result) {
            // console.log(result.status);
            // console.log(result.message);
            return result;
        }
    } catch {
        return { 'status': 'error', 'message': 'Erro ao realizar a requisição', 'codigo': '' };
    }
}

export async function getComents(slug) {
    try {
        const url = `https://apicaioemns.42web.io/backend/api/posts/buscarComentarios.php?slug=${slug}`
        const response = await fetch(url, {
            method: 'GET',
        })
        const result = await response.json();
        // if(result) {
        //     console.log(result);
        // }
        return result;

    } catch {
        console.log("Erro na requisição");
        
    }
}

export async function inserirComentario(slug, id_autor, conteudo) {
    const formData = new FormData;
    formData.append('slug', slug);
    formData.append('id_autor', id_autor);
    formData.append('conteudo', conteudo);
    try {
        const url = "https://apicaioemns.42web.io/backend/api/posts/inserirComentario.php";
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        return result;
    } catch {
        console.log("Erro na requisição");
        
    }
}