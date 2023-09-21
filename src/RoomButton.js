export default function RoomButton($app) {
    this.$target = document.createElement('button');
    this.$target.id = 'room-make';
    this.$target.innerHTML = '방 만들기';

    $app.append(this.$target);

    // Function to trigger the 'roomButtonClicked' event
    const triggerRoomButtonClicked = () => {
        const roomButtonClickedEvent = new Event('roomButtonClicked');
        document.dispatchEvent(roomButtonClickedEvent);
    };

    this.$target.addEventListener('click', () => {
        // Trigger the custom event when the button is clicked
        triggerRoomButtonClicked();
    });

    // Function to render the RoomButton
    this.render = () => {
        $app.innerHTML = '';
        $app.append(this.$target);
    };
}
