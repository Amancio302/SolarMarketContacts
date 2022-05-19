import Swal from 'sweetalert2'

export async function confirm(): Promise<boolean> {
    return await Swal.fire({
        title: 'Tem certeza?',
        text: "Essa ação é irreversível!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
    }).then((result) => {
        return result.isConfirmed
  })
}
