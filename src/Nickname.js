const Nickname = ($app, onClick) => {
    this.onClick = onClick;
    this.$target = document.createElement('div');
    this.$target.className = 'Nickname';
    $app.append(this.$target);

    this.render = () => {
        return `
        <div>
        `;
    };
};

export default Nickname;
