package com.example.MyProfileMobileApp.view.aichatbox

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyListScope
import androidx.compose.foundation.lazy.LazyListState
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AccountCircle
import androidx.compose.material3.LocalContentColor
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.ColorFilter
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.example.MyProfileMobileApp.R
import com.example.MyProfileMobileApp.model.AImessage.ResponseMessageFromAI
import com.example.MyProfileMobileApp.model.post.dto.MetaData
import com.example.MyProfileMobileApp.model.post.post3
import com.example.MyProfileMobileApp.view.theme.JetpackComposeExampleTheme


private val defaultSpacerSize = 16.dp

@Composable
fun AIChatBoxContent(
    responseMessageFromAI: com.example.MyProfileMobileApp.model.AImessage.ResponseMessageFromAI,
    modifier: Modifier = Modifier,
    state: LazyListState = rememberLazyListState()
){
    LazyColumn(
        contentPadding = PaddingValues(defaultSpacerSize),
        modifier = modifier,
        state = state,
        ) {
        postAIChatContentItem(responseMessageFromAI)
    }
}

fun LazyListScope.postAIChatContentItem(responseMessageFromAI: com.example.MyProfileMobileApp.model.AImessage.ResponseMessageFromAI) {
    item {
        AIChatBoxHeaderImage(responseMessageFromAI = responseMessageFromAI)
        Spacer(Modifier.height(defaultSpacerSize))
        Text(responseMessageFromAI.model_instance_id, style = MaterialTheme.typography.headlineLarge)
        Spacer(modifier = Modifier.height(8.dp))
//        if(!responseMessageFromAI.outputs.isEmpty()){
//            Text(responseMessageFromAI.outputs[0].content, style = MaterialTheme.typography.bodyMedium)
//            Spacer(Modifier.height(defaultSpacerSize))
//        }
    }
    item { AIChatBoxMetadata(post3.metaData, Modifier.padding(bottom = 24.dp)) }
    items(responseMessageFromAI.outputs) { AIParagraph(messageFromAI = it) }
}

@Composable
private fun AIChatBoxHeaderImage(responseMessageFromAI: com.example.MyProfileMobileApp.model.AImessage.ResponseMessageFromAI) {
    val imageModifier = Modifier
        .heightIn(min = 180.dp)
        .fillMaxWidth()
        .clip(shape = MaterialTheme.shapes.medium)

    Image(
        painter = painterResource(post3.imageId),
        contentDescription = null,
        modifier = imageModifier,
        contentScale = ContentScale.Crop
    )
}
@Composable
private fun AIChatBoxMetadata(
    metadata: MetaData,
    modifier: Modifier = Modifier
) {
    Row (
        modifier = modifier.semantics(mergeDescendants = true) {}
    ){
    Image(
        imageVector = Icons.Filled.AccountCircle,
        contentDescription = null,
        modifier = Modifier.size(40.dp),
        colorFilter = ColorFilter.tint(LocalContentColor.current),
        contentScale = ContentScale.Fit
    )
    Spacer(Modifier.width(8.dp))
    Column {
        Text(
            text = metadata.author.name,
            style = MaterialTheme.typography.labelLarge,
            modifier = Modifier.padding(top = 4.dp)
            )
        Text(
            text = stringResource(
                id = R.string.article_post_min_read,
                formatArgs = arrayOf(
                    metadata.date,
                    metadata.readTimeMinutes
                )
            ),
            style = MaterialTheme.typography.bodySmall,
        )
    }

    }
}

@Composable
private fun AIParagraph(messageFromAI: com.example.MyProfileMobileApp.model.AImessage.ResponseMessageFromAI.Output) {
                Text(modifier = Modifier.padding(4.dp),
                    text = messageFromAI.content,
                    )
//    Box(modifier = Modifier.padding(bottom = 24.dp)){
//        text =
//        when(paragraph.type) {
//            ParagraphType.Header -> {
//                Text(modifier = Modifier.padding(4.dp),
//                    text = paragraph.text,
//                    )
//            } else ->Text (
//            modifier = Modifier.padding(4.dp),
//            text = paragraph.text,
//            )
//        }
//    }
}

@Preview
@Composable
fun PreviewAIChatBoxPost() {
    JetpackComposeExampleTheme {
        Surface {
            AIChatBoxContent(responseMessageFromAI = com.example.MyProfileMobileApp.model.AImessage.ResponseMessageFromAI())
        }
    }
}