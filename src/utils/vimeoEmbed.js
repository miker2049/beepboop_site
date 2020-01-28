module.exports = function(title,id){
    return( `
<div style="padding:66.27% 0 0 0;position:relative;">
    <iframe src="https://player.vimeo.com/video/${id}?loop=1&title=0&byline=0&portrait=0" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
</div>
<script src="https://player.vimeo.com/api/player.js"></script>
<p>
    <a href="https://vimeo.com/${id}">${title}</a> from <a href="https://vimeo.com/user107970206">Mike</a> on <a href="https://vimeo.com">Vimeo</a>.
</p>
`);
}
