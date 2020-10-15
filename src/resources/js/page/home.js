let limit = 3;
let currentPage = 1;
let currentSearchBy = '';
let numPage = 1;

/* load data in the first time */
loadData(limit, 1);

/**
 * show data in table
 * @param limit: number of item
 * @param page: index page
 */
function loadData(limit = 3, page = 1) {
    $.ajax({
        url: `/api/users/${limit}/${page}/${currentSearchBy}`,
        method: 'get',
        success: function (data) {
            const bodyContent = $('#table-body');
            const listUsers = data.listUsers;

            /* clear table body */
            bodyContent.empty();

            currentPage = page;

            /* load pagination */
            loadPagination(limit, data['size'], page);

            /* show data in table */
            listUsers.forEach((user, index) => {
                const row = $(`
                    <tr>
                        <td>${index + 1 + (page - 1) * limit}</td>
                        <td><img class="img" src="${ user['src_img'] || 'images/avatar.jpg' }"></td>
                        <td>${user['full_name']}</td>
                        <td>${user['email']}</td>
                        <td>${user['is_active']}</td>
                        <td>
                            <div>
                                <i class="far fa-edit size-18 text-primary pointer"
                                   data-toggle="modal"
                                   data-id="${user['_id']}"
                                   data-target="#user-editor-dialog">
                                </i>
                                <i class="far fa-trash-alt size-18 text-danger ml-3 pointer"
                                   onclick="deleteUser('${user['_id']}')">
                                </i>
                            </div>
                       </td>
                    </tr>
                `);
                bodyContent.append(row);
            });
        },
    });
}

/**
 * render pagination menu
 * @param limit: number of item
 * @param length: datasource size
 * @param page: index of page
 */
function loadPagination(limit = 0, length = 0, page = 1) {
    const pagination = $('#pagination');
    pagination.empty();

    if (limit) {
        /* compute number of page */
        numPage = Math.ceil(length / limit);

        if (currentPage > numPage) {
            loadData(limit, currentPage - 1);
        }

        /* render item  */
        for (let i = 0; i < numPage; i++) {
            const item = $(`
                <li class="page-item pointer ${page === i + 1 ? 'active' : ''}">
                    <a class="page-link" onclick="loadData(limit, ${i + 1})">${i + 1}</a>
                </li>
            `);
            pagination.append(item);
        }
    }
}

/* pagination next */
function next() {
    if (currentPage < numPage) {
        loadData(limit, currentPage + 1);
    }
}

/* pagination previous */
function previous() {
    if (currentPage > 1) {
        loadData(limit, currentPage - 1);
    }
}

/* choose number of item on table */
function chooseSize(e) {
    limit = e.value;
    loadData(limit);
}

/**
 * delete user by id
 * @param id: user's id
 */
function deleteUser(id = null) {
    confirmDialog((status) => {
        if (status) {
            $.ajax({
                url: `/api/users/${id}/delete`,
                method: 'delete',
                data: {
                    _csrf: $('meta[name="_csrf"]').attr('content'),
                },
                success: function (data) {
                    loadData(limit, currentPage);
                },
            });
        }
    });
}

function searchUser() {
    currentSearchBy = $('#input-search').val();
    loadData(limit, 1);
}

$('#input-search').on('keypress', function (e) {
    if (e.which === 13) {
        searchUser();
    }
});
