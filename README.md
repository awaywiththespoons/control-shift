# control-shift

Holding page

### Json File 

<table style="width:100%">
  <tr>
    <th>Attribute</th>
    <th></th>
    <th></th>
    <th>Description</th> 
    <th>Essential</th>
    <th>Use</th>
  </tr>
  <tr class="important">
    <td>id</br><b>Int</td>
    <td></td>
    <td></td>
    <td>This is the id of the json object in the wider json array.</td>
    <td>Y</td>
    <td>Id is used to identify artist object in json. Never change id.</td>
  </tr>
  <tr>
  <td>Artist</br><b>Array</td>
    <td>Artist</br><b>String</td>
    <td></td>
    <td>Artist Name</td>
    <td>Y</td>
    <td>Modal & Artworks page</td>
  </tr>
  <tr>
     <td></td>
    <td>bio_100w</br><b>String</td>
    <td></td>
    <td>100 work artist bio</td>
    <td>Y</td>
    <td>Artist info in modal</td>
  </tr>
    <tr>
    <td></td>
    <td> image</br><b>Array </td>
    <td>url</br><b>String</td>
    <td>Name of image file</td>
    <td>N</td>
    <td>Currently not in use</td>
  </tr>
    <tr>
	    <td></td>
	   <td></td>
	    <td>alt</br><b>String</td>
	    <td>Alt text for image</td>
	    <td>N</td>
	    <td>Currently not in use</td>
  </tr>
  <tr>
	 <td> artwork</br><b>Array </td>
	<td>artwork_name</br><b>String</td>
	<td></td>
	<td>Artwork Name</td>
	<td>Y</td>
	<td>Modal & Artworks page</td>
</tr>
  <tr>
	 <td> </td>
	<td>artwork_description_150w_long</br><b>String</td>
	<td></td>
	<td>150 word artwork description</td>
	<td>Y</td>
	<td>Modal</td>
</tr>
  <tr>
	 <td></td>
	<td>artwork_description_50w_short</br><b>String</td>
	<td></td>
	<td>50 word artwork description</td>
	<td>N</td>
	<td>Currently not in use</td>
</tr>
  <tr class="important">
	 <td> </td>
	<td> details </br><b>object with key value pairs</td>
	<td> filterOnline </br><b>string</td>
	<td>Must be</br> "online" (if online)</br> "person" (if in person)</br>"online person" (if both)</td>
	<td>Y</td>
	<td>This defines the filter functionality on Artworks page</td>
</tr>
  <tr>
	 <td> </td>
	<td></td>
	<td> filterType </br><b>string</td>
	<td>Must be </br>"workshop"</br>"Exhibition" </br> "Discussion"</td>
	<td>N</td>
	<td>Currently not in use</td>
</tr>
  <tr class="important">
	 <td> </td>
	<td></td>
	<td> filterWeek </br><b>string</td>
	<td>Must be </br>"week-1"</br>"week-2" </br>"week-3" </br>"untimed"</td>
	<td>Y</td>
	<td>Modal & Artworks page</td>
</tr>
  <tr class="important">
	 <td> </td>
	<td></td>
	<td> day </br><b>string</td>
	<td>example "Monday"</td>
	<td>Y (if applicable)</td>
	<td>Modal displays "day + date" ex. "Monday 10th"</td>
</tr>
  <tr>
	 <td> </td>
	<td></td>
	<td> date </br><b>string</td>
	<td>example "10th"</td>
	<td>Y (if applicable)</td>
	<td>Important for schedule filtering - this is what makes an event appear on a certain date. Also used in modal "day + date" ex. "Monday 10th"</td>
</tr>
  <tr>
	 <td> </td>
	<td></td>
	<td> time </br><b>string</td>
	<td>example "11.00am - 12.30pm" </br> "" : empty string if no time, or delete the key value pair (line of json) </td>
	<td>Y (if applicable)</td>
	<td>Modal displays this info in top bar</td>
</tr>
  <tr>
	 <td> </td>
	<td></td>
	<td> location </br><b>string</td>
	<td>example "Bristol Harbourside" </br> "" : empty string if location not applicable, or delete the key value pair (line of json) </td>
	<td>Y (if applicable)</td>
	<td>Modal displays this info in top bar</td>
</tr>
  <tr>
	 <td> </td>
	<td></td>
	<td> location </br><b>string</td>
	<td>example "Bristol Harbourside" </br> "" : empty string if no time, or delete the key value pair (line of json) </td>
	<td>Y (if applicable)</td>
	<td>Modal displays this info in top bar</td>
</tr>

  <tr>
	<td>"social_media" </br><b>object with key value pairs</td>
	<td> website </br><b>string</td>
	<td> </td>
	<td>string with website url ex. "http://kathyhinde.co.uk/deep-listening-walks/" </td>
	<td>Y (if applicable)</td>
	<td>Delete key value pair if they don't have a website. Modal displays this info in social media section</td>
</tr>

  <tr>
	 <td> </td>
	<td> "twitter" </br><b>string</td>
		<td></td>
	<td>string with twitter url ex. "https://twitter.com/birdtwitchr" </td>
	<td>Y (if applicable)</td>
	<td>Delete key value pair if they don't have twitter. Modal displays this info in social media section</td>
</tr>

  <tr>
	 <td> </td>
	<td> "instagram" </br><b>string</td>
	<td></td>
	<td>string with Instagram url ex. "https://www.instagram.com/kathyhinde/" </td>
	<td>Y (if applicable)</td>
	<td>Delete key value pair if they don't have a Instagram. Modal displays this info in social media section</td>
</tr>

  <tr>
	 <td> </td>
	<td> "linkedIn" </br><b>string</td>
	<td></td>
	<td>string with linkedIn url </td>
	<td>Y (if applicable)</td>
	<td>Delete key value pair if they don't have a linkedin. Modal displays this info in social media section</td>
</tr>

</table>

<style>
table {
    width:100%;
    line-height: 14px;
}

tr { 
	line-height: 30px;
}
td {
	padding: 10px;
	border: 1px solid #053cb0;
}

.important {
background-color: #FDFCD1
}

</style>
