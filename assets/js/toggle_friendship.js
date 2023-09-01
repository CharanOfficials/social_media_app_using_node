class ToggleFriendship {
    constructor(toggleElement) {
        this.toggler = toggleElement;
        this.initialize();
    }

    initialize() {
        $(this.toggler).click((e) => {
            e.preventDefault();
            const self = this;
            $.ajax({
                type: 'GET',
                url: $(self.toggler).attr('href'),
            })
                .done((data) => {
                    console.log(data.status);
                    const friendshipStatus = data.data.status;
                    // Update the button text and attribute based on the received status
                    $(self.toggler).attr('toggle-friendship-button', friendshipStatus);
                    $(self.toggler).html(`${friendshipStatus} Friend`);
                })
                .fail((errData) => {
                    console.log('Error in completing the request');
                });
        });
    }
}
